package com.sinnerschrader.aem.react.loader;

import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;

import com.sinnerschrader.aem.react.exception.TechnicalException;
import com.sinnerschrader.aem.react.repo.RepositoryConnection;
import com.sinnerschrader.aem.react.repo.RepositoryConnectionFactory;

/**
 *
 *
 *
 * @author stemey
 *
 */
@Service
@Component(immediate = true)
public class JcrScriptLoaderImpl implements ScriptLoader {

  @Reference
  private RepositoryConnectionFactory connectionFactory;

  @Override
  public Reader loadJcrScript(String nodePath, String subServiceName) {

    try (RepositoryConnection con = connectionFactory.getConnection(subServiceName)) {
      Node node;
      try {
        node = con.getSession().getNode(nodePath);
        return new InputStreamReader(node.getProperty("jcr:data").getBinary().getStream(), "UTF-8");
      } catch (RepositoryException | UnsupportedEncodingException e) {
        throw new TechnicalException("cannot read script", e);
      }
    }
  }

}
